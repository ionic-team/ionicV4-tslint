import { ruleName } from '../src/ionRadioGroupIsNowAnElementRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-list>
            <ion-radio-group>
              <ion-item>
                <ion-label>Apple</ion-label>
                <ion-radio slot="start" value="apple"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-list>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when radio-group attribute is used on ion-list', () => {
      let source = `
      @Component({
        template: \`
          <ion-list radio-group>
                    ~~~~~~~~~~~
            <ion-item>
              <ion-label>Apple</ion-label>
              <ion-radio value="apple"></ion-radio>
            </ion-item>
          </ion-list>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'radio-group is now an ion-radio-group element instead of an Angular directive.',
        source
      });
    });
  });
});
