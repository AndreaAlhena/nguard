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
        {
            type: 'category',
            label: 'Number',
            link: { type: 'generated-index', title: 'Number validators' },
            items: [
                'validators/number/between',
                'validators/number/min',
                'validators/number/max',
                'validators/number/positive',
                'validators/number/negative',
            ],
        },
    ],
};

export default sidebars;
