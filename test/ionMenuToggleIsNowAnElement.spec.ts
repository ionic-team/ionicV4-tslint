import { ruleName } from '../src/ionMenuToggleIsNowAnElementRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-menu-toggle>
            <ion-button>
              Toggle Menu
            </ion-button>
          </ion-menu-toggle>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when menuToggle attribute is used on button', () => {
      let source = `
      @Component({
        template: \`
          <button ion-button menuToggle>Toggle Menu</button>\`
                             ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        source
      });
    });

    it('should fail when menuToggle attribute is used on anchor', () => {
      let source = `
      @Component({
        template: \`
          <a ion-button menuToggle (click)="doSomething()">Toggle Menu</a>\`
                        ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-button attribute is used with multiline', () => {
      let source = `
      @Component({
        template: \`
          <a
            ion-button
            menuToggle
            ~~~~~~~~~~
            (click)="doSomething()">Toggle Menu</a>\`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        source
      });
    });
  });
});
