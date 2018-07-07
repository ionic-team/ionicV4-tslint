import { expect } from 'chai';
import { Replacement, RuleFailure, Utils } from '../node_modules/tslint';
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
        constructor(private actionSheetController: ${controller}){}
        
        doWork(){
          this.actionSheetController.create({
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

      describe('replacements', () => {
        it('should replace multiple', () => {
          let source = `
      class DoSomething{
        constructor(private actionSheetController: ${controller}){}
        
        doWork(){
          this.actionSheetController.create({
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

          let failures = assertAnnotated({
            ruleName,
            message: ruleMessage,
            source
          });

          const fixes = (failures as RuleFailure[]).map(f => f.getFix());
          const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

          expect(res).to.eq(`
      class DoSomething{
        constructor(private actionSheetController: ${controller}){}
        
        doWork(){
          await this.actionSheetController.create({
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
          `);
        });
      });
    });
  }
});
