import { ruleName } from '../src/ionButtonIsNowAnElementRule';
import { assertAnnotated, assertSuccess } from './testHelper';

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
});
