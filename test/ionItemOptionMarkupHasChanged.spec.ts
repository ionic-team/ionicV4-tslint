import { ruleName, ruleMessage as message } from '../src/ionItemOptionMarkupHasChangedRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work when ion-chip-button is used', () => {
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
    it('should fail when ion-button is used', () => {
      let source = `
      @Component({
        template: \`
        <ion-item-sliding>
          <ion-item>
            <ion-label>Item 1</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <button ion-button expandable>
             ~~~~~~
              <ion-icon name="star"></ion-icon>
            </button>
          </ion-item-options>
        </ion-item-sliding>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message,
        source
      });
    });
  });
});
