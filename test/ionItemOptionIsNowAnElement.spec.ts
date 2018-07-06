import { ruleName } from '../src/ionItemOptionIsNowAnElementRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-item-sliding>
            <ion-item>
              <ion-label>Item 1</ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option expandable>
                <ion-icon name="star"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-button attribute is used on a button within ion-item-options', () => {
      let source = `
      @Component({
        template: \`
          <ion-item-options side="end">
            <button ion-button expandable>
             ~~~~~~
              <ion-icon name="star"></ion-icon>
            </button>
          </ion-item-options>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'Buttons within ion-item-options are now ion-item-option elements instead of Angular directives.',
        source
      });
    });
  });
});
