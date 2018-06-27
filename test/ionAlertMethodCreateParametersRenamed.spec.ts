import { expect } from 'chai';
import { Replacement } from 'tslint';
import { ruleName } from '../src/ionAlertMethodCreateParametersRenamedRule';
import { assertAnnotated, assertSuccess } from './testHelper';

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

    it('should work with different names for the AlertController object', () => {
      let source = `
      class DoSomething{
        constructor(private myOtherNamedalertCtrl: AlertController){}

        showAlert(){
          const alert = await this.myOtherNamedalertCtrl.create({
            title: 'This is the title',
            subTitle: 'this is the sub title'
          });
          await alert.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should not trigger for other object with create method', () => {
      let source = `
      class DoSomething{
        constructor(private foo: Foo){}

        showAlert(){
          const alert = await this.foo.create({
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
        message: 'The title parameter has been replaced by header.',
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
        message: 'The subTitle parameter has been replaced by subHeader.',
        source
      });
    });

    it('should fail no matter where the constructor is placed in code', () => {
      let source = `
      class DoSomething{
        showAlert(){
          const alert = await this.alertCtrl.create({
            header: 'This is the title',            
            subTitle: 'this is the sub title'            
            ~~~~~~~~
          });
          await alert.present();
        }

        constructor(private alertCtrl: AlertController){}
      }
          `;

      assertAnnotated({
        ruleName,
        message: 'The subTitle parameter has been replaced by subHeader.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should fail when navbar is passed in', () => {
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

      const failures = assertAnnotated({
        ruleName,
        message: 'The subTitle parameter has been replaced by subHeader.',
        source
      });

      const fixes: Replacement[] = failures[0].getFix() as any;

      const res = Replacement.applyAll(source, fixes);
      expect(res).to.eq(`
      class DoSomething{
        constructor(private alertCtrl: AlertController){}

        showAlert(){
          const alert = await this.alertCtrl.create({
            header: 'This is the title',            
            subHeader: 'this is the sub title'
            ~~~~~~~~
          });
          await alert.present();
        }
      }
          `);
    });
  });
});
