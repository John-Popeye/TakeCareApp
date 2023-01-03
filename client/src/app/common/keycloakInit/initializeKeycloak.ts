import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8069',
        realm: 'takecare',
        clientId: 'frontend',
      },
      initOptions: {
        onLoad: `check-sso`,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true
    }).catch(()=> null);
}
