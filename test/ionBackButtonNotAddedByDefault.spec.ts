import { ruleName } from '../src/ionBackButtonNotAddedByDefaultRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
            </ion-buttons>
            <ion-title>Back Button Example</ion-title>
          </ion-toolbar>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-buttons is missing', () => {
      let source = `
      @Component({
        template: \`
          <ion-toolbar>
           ~~~~~~~~~~~
            <ion-title>Back Button Example</ion-title>
          </ion-toolbar>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The back button in an ion-toolbar is no longer automatically added.',
        source
      });
    });

    it('should fail when ion-back-button is missing in ion-buttons', () => {
      let source = `
      @Component({
        template: \`
          <ion-toolbar>
           ~~~~~~~~~~~
            <ion-buttons slot="start">
            </ion-buttons>
            <ion-title>Back Button Example</ion-title>
          </ion-toolbar>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The back button in an ion-toolbar is no longer automatically added.',
        source
      });
    });
  });
});
