import { AbstractControl } from '@angular/forms';
import { NguardSlugDirective } from './nguard-slug.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardSlugDirective', () => {
    let control: AbstractControl;
    let directive: NguardSlugDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardSlugDirective, '<div nguardSlug></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a simple slug', () => {
        control = createAbstractControlSpy('my-blog-post');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on uppercase characters', () => {
        control = createAbstractControlSpy('My-Blog-Post');

        expect(directive.validate(control)).toEqual({ slug: true });
    });

    it('should fail on consecutive dashes', () => {
        control = createAbstractControlSpy('my--post');

        expect(directive.validate(control)).toEqual({ slug: true });
    });
});
