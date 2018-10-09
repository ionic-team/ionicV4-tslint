import { ruleMessage, ruleName } from '../src/ionOverlayMethodCreateShouldUseAwaitRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work when await exists in front of the create method', () => {
      let source = `
      class DoSomething{
        constructor(private actionSheetController: ActionSheetController){}
        
        doWork(){
          await this.actionSheetController.create({
            component: PopoverComponent,
            ev: event,
            translucent: true
          })
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should work when then() is used', () => {
      let source = `
      class DoSomething{
        constructor(private actionSheetController: ActionSheetController){}
        
        doWork(){
          this.actionSheetController.create({
            component: PopoverComponent,
            ev: event,
            translucent: true
          }).then(() => {});
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should work when the controller variable is named something else', () => {
      let source = `
      class DoSomething{
        constructor(private strangelyNamedCtrl: ActionSheetController){}
        
        doWork(){
          await this.strangelyNamedCtrl.create({
            component: PopoverComponent,
            ev: event,
            translucent: true
          })
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should not do anything if the class name does not match', () => {
      let source = `
      class DoSomething{
        constructor(private someOtherController: SomeOtherController){}
        
        doWork(){
          await this.someOtherController.create({
            component: PopoverComponent,
            ev: event,
            translucent: true
          })
        }
      }
        `;
      assertSuccess(ruleName, source);
    });
  });

  const controllersList = [
    'ActionSheetController',
    'AlertController',
    'LoadingController',
    'ModalController',
    'PopoverController',
    'ToastController'
  ];

  for (let controller of controllersList) {
    describe(controller, () => {
      describe('failure', () => {
        it('should fail if await is not present', () => {
          let source = `
      class DoSomething{
        constructor(private poorlyNamedController: ${controller}){}
        
        doWork(){
          this.poorlyNamedController.create({
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            component: PopoverComponent,
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ev: event,
            ~~~~~~~~~~
            translucent: true
            ~~~~~~~~~~~~~~~~~
          })
          ~~
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
  }
});
