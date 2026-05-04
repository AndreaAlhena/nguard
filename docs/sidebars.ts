import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    mainSidebar: [
        'getting-started',
        'architecture',
        {
            type: 'category',
            label: 'CrossField',
            link: { type: 'generated-index', title: 'CrossField validators' },
            items: [
                'validators/cross-field/confirmed',
                'validators/cross-field/different',
                'validators/cross-field/required-if',
                'validators/cross-field/same',
            ],
        },
    ],
};

export default sidebars;
