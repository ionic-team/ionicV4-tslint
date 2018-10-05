import { expect } from 'chai';
import { ruleName } from '../src/ionFabButtonIsNowAnElementRule';
import { assertAnnotated, assertSuccess, assertFailure } from './testHelper';
import { Replacement, Utils } from 'tslint';

describe(ruleName, () => {
  describe('success', () => {
    it('should not trigger for parent ion-fab', () => {
      let source = `
      @Component({
        template: \`
          <ion-fab>
            <ion-fab-button></ion-fab-button>
            <ion-fab-list>
              <ion-fab-button></ion-fab-button>
              <ion-fab-button></ion-fab-button>
            </ion-fab-list>
          </ion-fab>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });

    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-fab-button></ion-fab-button>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-fab attribute is used on button', () => {
      let source = `
      @Component({
        template: \`
          <button ion-fab></button>\`
                  ~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-fab is now an ion-fab-button element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-fab attribute is used on anchor', () => {
      let source = `
      @Component({
        template: \`
          <a ion-fab (click)="doSomething()"></a>\`
             ~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-fab is now an ion-fab-button element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-fab attribute is used with multiline', () => {
      let source = `
      @Component({
        template: \`
          <a
            ion-fab
            ~~~~~~~
            (click)="doSomething()">Click Me</a>\`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-fab is now an ion-fab-button element instead of an Angular directive.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace button with ion-fab-button and remove attribute', () => {
      let source = `
        @Component({
          template: \`<button ion-fab></button>
          \`
        })
        class Bar {}
      `;
      const fail = {
        message: 'ion-fab is now an ion-fab-button element instead of an Angular directive.',
        startPosition: {
          line: 2,
          character: 29
        },
        endPosition: {
          line: 2,
          character: 36
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-fab-button></ion-fab-button>
          \`
        })
        class Bar {}
      `;
      expect(res).to.eq(expected);
    });
  });
});
