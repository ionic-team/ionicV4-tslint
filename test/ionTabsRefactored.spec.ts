import { ruleName } from '../src/ionTabsRefactoredRule';
import { assertAnnotated } from './testHelper';
describe(ruleName, () => {
  describe('failure', () => {
    it('should fail when ion-tabs are used', () => {
      let source = `
      @Component({
        template: \`
          <ion-tabs>
           ~~~~~~~~

          </ion-tabs>
          \`
      })
      class Bar{}
          `;
      assertAnnotated({
        ruleName,
        message: `Tabs have gone through a significant refactor.
    Please see https://github.com/ionic-team/ionic/blob/master/CHANGELOG.md#angular-tabs`,
        source
      });
    });
  });
});
