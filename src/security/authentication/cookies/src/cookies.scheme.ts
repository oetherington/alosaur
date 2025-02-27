import { AuthClaims, AuthenticationScheme, Identity } from "../../core/auth.interface.ts";
import { SESSION_SIGNATURE_PREFIX_KEY, SessionInterface } from "../../../session/src/session.interface.ts";
import { deleteCookie } from "https://deno.land/std@0.132.0/http/cookie.ts";
import { SecurityContext } from "../../../context/security-context.ts";
import { Redirect } from "../../../../renderer/redirect.ts";

export const IdentityKey = "__identity_cookie";

export class CookiesScheme implements AuthenticationScheme {
  constructor(private readonly loginUrl: string) {
  }

  public async authenticate(context: SecurityContext): Promise<void> {
    await this.setIdentity(context);
    return undefined;
  }

  private async setIdentity(context: SecurityContext) {
    if (context.security.session) {
      const identity: any = await context.security.session.get(IdentityKey);
      context.security.auth.identity = () => identity;
    }
  }

  public async signInAsync<I, R>(
    context: SecurityContext,
    identity: Identity<I>,
    claims?: AuthClaims,
  ): Promise<R> {
    const session = CookieGetSession(context);
    await session.set(IdentityKey, identity);
    await this.setIdentity(context);

    return <unknown> true as R;
  }

  public async signOutAsync<T, R>(context: SecurityContext): Promise<R> {
    const session = CookieGetSession(context);
    const sid = session.sessionId;
    await session.store.delete(sid);
    context.security.auth.identity = () => undefined;

    deleteCookie(
      context.response.headers,
      context.security.session!.sessionKey,
    );
    deleteCookie(
      context.response.headers,
      session.sessionKey + SESSION_SIGNATURE_PREFIX_KEY,
    );

    return <unknown> true as R;
  }

  onFailureResult(context: SecurityContext): void {
    context.response.result = Redirect(this.loginUrl);
    context.response.setImmediately();
  }

  onSuccessResult(context: SecurityContext): void {
    // nothing
  }
}

export function CookieGetSession(context: SecurityContext): SessionInterface {
  if (context.security.session) {
    return context.security.session;
  } else {
    throw new Error(
      "Session middleware is required for use CookiesScheme Authentication",
    );
  }
}
