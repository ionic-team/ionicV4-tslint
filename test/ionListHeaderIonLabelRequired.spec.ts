import { ruleName } from '../src/ionListHeaderIonLabelRequiredRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with ion-label child', () => {
      let source = `
      @Component({
        template: \`
          <ion-list-header>
            <ion-thumbnail slot="start">
              <img src="http://pngimg.com/upload/dog_png2402.png">
            </ion-thumbnail>
            <ion-label>Dog</ion-label>
          </ion-list-header>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });

    it('should work with single ion-label child', () => {
      let source = `
      @Component({
        template: \`
          <ion-list-header>
            <ion-label>Dog</ion-label>
          </ion-list-header>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-label missing', () => {
      let source = `
      @Component({
        template: \`
          <ion-list-header>
           ~~~~~~~~~~~~~~~
            <ion-thumbnail slot="start">
              <img src="http://pngimg.com/upload/dog_png2402.png">
            </ion-thumbnail>
            Dog
          </ion-toolbar>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The ion-list-header requires an ion-label component. It is no longer automatically added.',
        source
      });
    });

    it('should fail with only text', () => {
      let source = `
      @Component({
        template: \`
          <ion-list-header>Dog</ion-list-header>
           ~~~~~~~~~~~~~~~
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The ion-list-header requires an ion-label component. It is no longer automatically added.',
        source
      });
    });
  });
});
