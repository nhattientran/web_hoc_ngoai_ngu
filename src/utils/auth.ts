import { Language } from '../types';

export interface AuthUserSession {
  userId: string;
  name: string;
  email: string;
  preferredLanguage: Language;
  isGuest?: boolean;
  loggedInAt: string;
}

interface StoredAccount {
  userId: string;
  name: string;
  email: string;
  password: string;
  preferredLanguage: Language;
  createdAt: string;
}

const ACCOUNTS_KEY = 'manabi_accounts_v1';
const SESSION_KEY = 'manabi_auth_session_v1';

export const DEMO_ACCOUNT_CREDENTIALS = {
  email: 'hocvien@manabi.edu.vn',
  password: 'Manabi123!',
  name: 'Minh Thảo',
};

const TEMP_SEEDED_ACCOUNTS: StoredAccount[] = [
  {
    userId: 'demo-user-1',
    name: DEMO_ACCOUNT_CREDENTIALS.name,
    email: DEMO_ACCOUNT_CREDENTIALS.email,
    password: DEMO_ACCOUNT_CREDENTIALS.password,
    preferredLanguage: 'en',
    createdAt: '2026-11-14T00:00:00.000Z',
  },
  {
    userId: 'user-thao-temp',
    name: 'Thảo',
    email: 'Thảo',
    password: '12345679',
    preferredLanguage: 'en',
    createdAt: '2026-11-14T00:00:00.000Z',
  },
];

function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const parsed: StoredAccount[] = raw ? JSON.parse(raw) : [];
    const missingSeeds = TEMP_SEEDED_ACCOUNTS.filter(
      (seed) =>
        !parsed.some(
          (a) =>
            a.userId === seed.userId ||
            a.email.normalize('NFC').toLowerCase() === seed.email.normalize('NFC').toLowerCase()
        )
    );
    if (missingSeeds.length > 0) {
      const merged = [...missingSeeds, ...parsed];
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    return TEMP_SEEDED_ACCOUNTS;
  }
}

function saveAccounts(accounts: StoredAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // Ignore storage quota errors
  }
}

export function getAuthSession(): AuthUserSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistSession(session: AuthUserSession, remember: boolean): void {
  try {
    const serialized = JSON.stringify(session);
    if (remember) {
      localStorage.setItem(SESSION_KEY, serialized);
      sessionStorage.removeItem(SESSION_KEY);
    } else {
      sessionStorage.setItem(SESSION_KEY, serialized);
      localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Ignore storage quota errors
  }
}

export function loginWithEmail(params: {
  email: string;
  password: string;
  remember: boolean;
}): { ok: true; session: AuthUserSession } | { ok: false; error: string } {
  const identifier = params.email.trim().normalize('NFC').toLowerCase();
  const password = params.password;

  if (!identifier || !password) {
    return { ok: false, error: 'Vui lòng nhập đầy đủ tên đăng nhập / email và mật khẩu.' };
  }

  const accounts = readAccounts();
  const match = accounts.find(
    (a) =>
      a.email.normalize('NFC').toLowerCase() === identifier ||
      a.name.normalize('NFC').toLowerCase() === identifier
  );
  if (!match) {
    return { ok: false, error: 'Không tìm thấy tài khoản phù hợp.' };
  }
  if (match.password !== password) {
    return { ok: false, error: 'Mật khẩu chưa đúng. Vui lòng thử lại.' };
  }

  const session: AuthUserSession = {
    userId: match.userId,
    name: match.name,
    email: match.email,
    preferredLanguage: match.preferredLanguage,
    isGuest: false,
    loggedInAt: new Date().toISOString(),
  };
  persistSession(session, params.remember);
  return { ok: true, session };
}

export function registerAccount(params: {
  name: string;
  email: string;
  password: string;
  preferredLanguage: Language;
}): { ok: true; session: AuthUserSession } | { ok: false; error: string } {
  const name = params.name.trim();
  const email = params.email.trim().toLowerCase();
  const password = params.password;

  if (name.length < 2) {
    return { ok: false, error: 'Tên hiển thị cần ít nhất 2 ký tự.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email chưa đúng định dạng.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Mật khẩu cần tối thiểu 6 ký tự.' };
  }

  const accounts = readAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === email)) {
    return { ok: false, error: 'Email này đã được đăng ký. Hãy chuyển sang tab Đăng nhập.' };
  }

  const newAccount: StoredAccount = {
    userId: `user-${Date.now()}`,
    name,
    email,
    password,
    preferredLanguage: params.preferredLanguage,
    createdAt: new Date().toISOString(),
  };
  saveAccounts([...accounts, newAccount]);

  const session: AuthUserSession = {
    userId: newAccount.userId,
    name: newAccount.name,
    email: newAccount.email,
    preferredLanguage: newAccount.preferredLanguage,
    isGuest: false,
    loggedInAt: new Date().toISOString(),
  };
  persistSession(session, true);
  return { ok: true, session };
}

export function loginAsGuest(preferredLanguage: Language): AuthUserSession {
  const session: AuthUserSession = {
    userId: 'guest-local',
    name: 'Học viên Khách',
    email: 'guest@local',
    preferredLanguage,
    isGuest: true,
    loggedInAt: new Date().toISOString(),
  };
  persistSession(session, true);
  return session;
}

export function logoutAuthSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
}
