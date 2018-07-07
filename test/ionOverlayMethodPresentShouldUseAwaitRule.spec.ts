import { ruleMessage, ruleName } from '../src/ionOverlayMethodPresentShouldUseAwaitRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work when await exists in front of the present method', () => {
      let source = `
      class DoSomething{
        constructor(private actionSheetController: ActionSheetController){}
        
        doWork(){
          var ctrl = await this.actionSheetController.create({
            component: PopoverComponent,
            ev: event,
            translucent: true
          });

          await ctrl.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail if await is not present', () => {
      let source = `
      class DoSomething{
        constructor(private actionSheetController: ActionSheetController){}
        
        doWork(){
          var ctrl = this.actionSheetController.create({
            component: PopoverComponent,
            ev: event,
            translucent: true
          });

          ctrl.present();
          ~~~~~~~~~~~~~~
        }
      }
        `;
      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });
  });
});
