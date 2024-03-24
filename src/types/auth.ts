import { EnumYesOrNo } from './advanced';

export interface WxCode2SessionInfo {
  userId: number;
  openid: string;
  phone: string;
}

export interface GetTokenRequest {
  encryptedData?: string;
  iv?: string;
  code?: string;
  sessionKey?: string;
  grant_type: string;
  wxNickname?: string;
  refresh_token?: string;
  openid?: string;
  serverTenantId?: number;
}

export interface TokenResponse {
  access_token: string;
  expires_In: number;
  isRegistered: EnumYesOrNo;
  refresh_token: string;
}

export interface XnToken {
  token: string;
  expires_In: number;
  refresh_token: string;
  status: 'success' | 'error';
}
