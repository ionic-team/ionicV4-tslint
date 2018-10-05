import { expect } from 'chai';
import { ruleName } from '../src/ionButtonIsNowAnElementRule';
import { assertAnnotated, assertSuccess, assertFailure } from './testHelper';
import { Utils, Replacement } from 'tslint';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-button></ion-button>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-button attribute is used on button', () => {
      let source = `
      @Component({
        template: \`
          <button ion-button></button>\`
                  ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-button is now an ion-button element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-button attribute is used on anchor', () => {
      let source = `
      @Component({
        template: \`
          <a ion-button (click)="doSomething()"></a>\`
             ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-button is now an ion-button element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-button attribute is used with multiline', () => {
      let source = `
      @Component({
        template: \`
          <a
            ion-button
            ~~~~~~~~~~
            (click)="doSomething()">Click Me</a>\`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-button is now an ion-button element instead of an Angular directive.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace button with ion-button and remove attribute', () => {
      let source = `
        @Component({
          template: \`<button ion-button></button>
          \`
        })
        class Bar {}
      `;
      const fail = {
        message: 'ion-button is now an ion-button element instead of an Angular directive.',
        startPosition: {
          line: 2,
          character: 29
        },
        endPosition: {
          line: 2,
          character: 39
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button></ion-button>
          \`
        })
        class Bar {}
      `;
      expect(res).to.eq(expected);
    });
  });
});
