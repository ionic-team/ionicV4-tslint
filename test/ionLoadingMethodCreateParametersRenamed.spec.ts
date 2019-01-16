import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionLoadingMethodCreateParametersRenamedRule';
import { assertAnnotated, assertFailures, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      class DoSomething{
        constructor(private loadingCtrl: LoadingController){}

        showLoading(){
          const loading = await this.loadingCtrl.create({
            message: 'This is the title'
          });
          await loading.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should not be triggered if the type is not LoadingController', () => {
      let source = `
      class DoSomething{
        constructor(private loadingCtrl: SomeOtherController){}

        showLoading(){
          const loading = await this.loadingCtrl.create({
            content: 'This is the title'
          });
          await loading.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should work with different names for the LoadingController object', () => {
      let source = `
      class DoSomething{
        constructor(private myOtherNamedCtrl: LoadingController){}

        showLoading(){
          const loading = await this.myOtherNamedCtrl.create({
            message: 'This is the title'
          });
          await loading.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when content is passed in', () => {
      let source = `
      class DoSomething{
        constructor(private loadingCtrl: LoadingController){}

        showLoading(){
          const loading = await this.loadingCtrl.create({
            content: 'This is the title'
            ~~~~~~~
          });
          await loading.present();
        }
      }
          `;

      assertAnnotated({
        ruleName,
        message: 'Property content has been renamed to message.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace content', () => {
      let source = `
      class DoSomething{
        constructor(private loadingCtrl: LoadingController){}

        showLoading(){
          const loading = await this.loadingCtrl.create({
            content: 'This is the title'
          });
          await loading.present();
        }
      }
          `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'Property content has been renamed to message.',
          startPosition: {
            line: 6,
            character: 12
          },
          endPosition: {
            line: 6,
            character: 19
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
      class DoSomething{
        constructor(private loadingCtrl: LoadingController){}

        showLoading(){
          const loading = await this.loadingCtrl.create({
            message: 'This is the title'
          });
          await loading.present();
        }
      }
          `);
    });
  });
});
