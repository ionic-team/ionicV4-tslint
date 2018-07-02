import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionAlertMethodCreateParametersRenamedRule';
import { assertAnnotated, assertFailures, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      class DoSomething{
        constructor(private alertCtrl: AlertController){}

        showAlert(){
          const alert = await this.alertCtrl.create({
            header: 'This is the title',
            subHeader: 'this is the sub title'
          });
          await alert.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should not be triggered if the type is not AlertController', () => {
      let source = `
      class DoSomething{
        constructor(private actionSheetCtrl: SomeOtherController){}

        showActionSheet(){
          const actionSheet = await this.actionSheetCtrl.create({
            title: 'This is the title',
            subTitle: 'this is the sub title'
          });
          await actionSheet.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should work with different names for the AlertController object', () => {
      let source = `
      class DoSomething{
        constructor(private myOtherNamedCtrl: AlertController){}

        showAlert(){
          const alert = await this.myOtherNamedCtrl.create({
            header: 'This is the title',
            subHeader: 'this is the sub title'
          });
          await alert.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when title is passed in', () => {
      let source = `
      class DoSomething{
        constructor(private alertCtrl: AlertController){}

        showAlert(){
          const alert = await this.alertCtrl.create({
            title: 'This is the title',
            ~~~~~
            subTitle: 'this is the sub title'            
          });
          await alert.present();
        }
      }
          `;

      assertAnnotated({
        ruleName,
        message: 'Property title has been renamed to header.',
        source
      });
    });

    it('should fail when subTitle is passed in', () => {
      let source = `
      class DoSomething{
        constructor(private alertCtrl: AlertController){}

        showAlert(){
          const alert = await this.alertCtrl.create({
            header: 'This is the title',            
            subTitle: 'this is the sub title'            
            ~~~~~~~~
          });
          await alert.present();
        }
      }
          `;

      assertAnnotated({
        ruleName,
        message: 'Property subTitle has been renamed to subHeader.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace multiple', () => {
      let source = `
      class DoSomething{
        constructor(private alertCtrl: AlertController){}

        showAlert(){
          const alert = await this.alertCtrl.create({
            title: 'This is the title',            
            subTitle: 'this is the sub title'
          });
          await alert.present();
        }
      }
          `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'Property title has been renamed to header.',
          startPosition: {
            line: 6,
            character: 12
          },
          endPosition: {
            line: 6,
            character: 17
          }
        },
        {
          message: 'Property subTitle has been renamed to subHeader.',
          startPosition: {
            line: 7,
            character: 12
          },
          endPosition: {
            line: 7,
            character: 20
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
      class DoSomething{
        constructor(private alertCtrl: AlertController){}

        showAlert(){
          const alert = await this.alertCtrl.create({
            header: 'This is the title',            
            subHeader: 'this is the sub title'
          });
          await alert.present();
        }
      }
          `);
    });
  });
});
