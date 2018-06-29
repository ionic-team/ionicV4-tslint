import { ruleName } from '../src/ionItemIsNowAnElementRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-item></ion-item>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-item attribute is used on button', () => {
      let source = `
      @Component({
        template: \`
          <button ion-item></button>\`
                  ~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-item is now an ion-item element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-item attribute is used on anchor', () => {
      let source = `
      @Component({
        template: \`
          <a ion-item (click)="doSomething()"></a>\`
             ~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-item is now an ion-item element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-item attribute is used with multiline', () => {
      let source = `
      @Component({
        template: \`
          <a
            ion-item
            ~~~~~~~~
            (click)="doSomething()">Click Me</a>\`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-item is now an ion-item element instead of an Angular directive.',
        source
      });
    });
  });
});
