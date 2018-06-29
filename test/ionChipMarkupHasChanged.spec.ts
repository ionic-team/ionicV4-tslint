import { ruleName } from '../src/ionChipMarkupHasChangedRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work when ion-chip-button is used', () => {
      let source = `
      @Component({
        template: \`
        <ion-chip>
          <ion-label>Default</ion-label>
          <ion-chip-button fill="clear" color="light">
            <ion-icon name="close-circle"></ion-icon>
          </ion-chip-button>
        </ion-chip>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-button is used', () => {
      let source = `
      @Component({
        template: \`
        <ion-chip>
          <ion-label>Default</ion-label>
          <ion-button clear color="light">
           ~~~~~~~~~~
            <ion-icon name="close-circle"></ion-icon>
          </ion-button>
        </ion-chip>\`                      
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'Inside of ion-chip, ion-chip-button must be used instead of ion-button.',
        source
      });
    });
  });
});
