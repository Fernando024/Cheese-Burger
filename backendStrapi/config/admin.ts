import type { Core } from '@strapi/strapi';

const getPreviewPathname = (
  uid: string,
  document: Record<string, any> | null
): string | null => {
  if (!document) return null;
  const { slug } = document;

  switch (uid) {
    case 'api::page.page': {
      if (slug === 'inicio') return '/';
      if (!slug) return null;
      return `/${slug}`;
    }
    default:
      return null;
  }
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', ''),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', ''),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL')].filter(Boolean) as string[],
      async handler(uid, { documentId, locale, status }) {
        const clientUrl = env('CLIENT_URL');
        if (!clientUrl) return null;

        const document = await (strapi as any).documents(uid).findOne({ documentId });

        const pathname = getPreviewPathname(uid, document);
        if (!pathname) return null;

        const params = new URLSearchParams();
        params.set('url', pathname);
        params.set('secret', env('PREVIEW_SECRET') || '');
        if (status) params.set('status', status);

        return `${clientUrl}/api/preview?${params}`;
      },
    },
  },
});

export default config;
