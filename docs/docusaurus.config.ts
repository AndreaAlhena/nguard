import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const GITHUB_REPO = 'https://github.com/AndreaAlhena/nguard';

const config: Config = {
    title: 'nguard',
    tagline: 'Angular validators with a Laravel-inspired API',
    favicon: 'img/favicon.ico',

    future: {
        v4: true,
    },

    url: 'https://nguard.andreatantimonaco.me',
    baseUrl: '/',

    organizationName: 'AndreaAlhena',
    projectName: 'nguard',

    onBrokenLinks: 'throw',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl: `${GITHUB_REPO}/tree/develop/docs/`,
                    routeBasePath: '/',
                    lastVersion: 'current',
                    versions: {
                        current: {
                            label: '0.8.0',
                        },
                    },
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'nguard',
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'mainSidebar',
                    position: 'left',
                    label: 'Documentation',
                },
                {
                    type: 'docsVersionDropdown',
                    position: 'right',
                },
                {
                    href: GITHUB_REPO,
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Documentation',
                    items: [
                        { label: 'Getting Started', to: '/' },
                        { label: 'Architecture', to: '/architecture' },
                    ],
                },
                {
                    title: 'Project',
                    items: [
                        { label: 'GitHub', href: GITHUB_REPO },
                        { label: 'Issues', href: `${GITHUB_REPO}/issues` },
                        { label: 'Releases', href: `${GITHUB_REPO}/releases` },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Andrea Alhena Tantimonaco. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['typescript', 'tsx', 'bash', 'json'],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
