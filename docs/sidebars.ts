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
                'validators/number/decimal',
                'validators/number/digits',
                'validators/number/digits-between',
                'validators/number/even',
                'validators/number/greater-than',
                'validators/number/greater-than-or-equal',
                'validators/number/integer',
                'validators/number/lesser-than',
                'validators/number/lesser-than-or-equal',
                'validators/number/max',
                'validators/number/max-digits',
                'validators/number/min',
                'validators/number/min-digits',
                'validators/number/multiple-of',
                'validators/number/negative',
                'validators/number/numeric',
                'validators/number/odd',
                'validators/number/positive',
            ],
        },
        {
            type: 'category',
            label: 'String',
            link: { type: 'generated-index', title: 'String validators' },
            items: [
                'validators/string/alpha',
                'validators/string/alpha-dash',
                'validators/string/alpha-num',
                'validators/string/ascii',
            ],
        },
    ],
};

export default sidebars;
