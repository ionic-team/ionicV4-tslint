import { ruleName } from '../src/ionFabButtonIsNowAnElementRule';
import { assertAnnotated, assertSuccess } from './testHelper';

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
});
