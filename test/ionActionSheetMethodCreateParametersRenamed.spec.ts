import { expect } from 'chai';
import { Replacement } from 'tslint';
import { ruleName } from '../src/ionActionSheetMethodCreateParametersRenamedRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      class DoSomething{
        constructor(private actionSheetCtrl: ActionSheetController){}

        function showActionSheet(){
          const actionSheet = await actionSheetCtrl.create({
            header: 'This is the title',
            subHeader: 'this is the sub title'
          });
          await actionSheet.present();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should work with different names for the ActionSheetController object', () => {
      let source = `
      class DoSomething{
        constructor(private myOtherNamedActionSheetCtrl: ActionSheetController){}

        function showActionSheet(){
          const actionSheet = await myOtherNamedActionSheetCtrl.create({
            header: 'This is the title',
            subHeader: 'this is the sub title'
          });
          await actionSheet.present();
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
        constructor(private actionSheetCtrl: ActionSheetController){}

        function showActionSheet(){
          const actionSheet = await actionSheetCtrl.create({
            title: 'This is the title',
            ~~~~~
            subTitle: 'this is the sub title'            
          });
          await actionSheet.present();
        }
      }
          `;

      assertAnnotated({
        ruleName,
        message: 'The title field has been replaced by header.',
        source
      });
    });

    it('should fail when subTitle is passed in', () => {
      let source = `
      class DoSomething{
        constructor(private actionSheetCtrl: ActionSheetController){}

        function showActionSheet(){
          const actionSheet = await actionSheetCtrl.create({
            header: 'This is the title',            
            subTitle: 'this is the sub title'            
            ~~~~~~~~
          });
          await actionSheet.present();
        }
      }
          `;

      assertAnnotated({
        ruleName,
        message: 'The subTitle field has been replaced by subHeader.',
        source
      });
    });

    it('should fail no matter where the constructor is placed in code', () => {
      let source = `
      class DoSomething{
        function showActionSheet(){
          const actionSheet = await actionSheetCtrl.create({
            header: 'This is the title',            
            subTitle: 'this is the sub title'            
            ~~~~~~~~
          });
          await actionSheet.present();
        }

        constructor(private actionSheetCtrl: ActionSheetController){}
      }
          `;

      assertAnnotated({
        ruleName,
        message: 'The subTitle field has been replaced by subHeader.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should fail when navbar is passed in', () => {
      let source = `
      class DoSomething{
        constructor(private actionSheetCtrl: ActionSheetController){}

        function showActionSheet(){
          const actionSheet = await actionSheetCtrl.create({
            header: 'This is the title',            
            subTitle: 'this is the sub title'
            ~~~~~~~~
          });
          await actionSheet.present();
        }
      }
          `;

      const failures = assertAnnotated({
        ruleName,
        message: 'The subTitle field has been replaced by subHeader.',
        source
      });

      const fixes: Replacement[] = failures[0].getFix() as any;

      const res = Replacement.applyAll(source, fixes);
      expect(res).to.eq(`
      class DoSomething{
        constructor(private actionSheetCtrl: ActionSheetController){}

        function showActionSheet(){
          const actionSheet = await actionSheetCtrl.create({
            header: 'This is the title',            
            subHeader: 'this is the sub title'
            ~~~~~~~~
          });
          await actionSheet.present();
        }
      }
          `);
    });
  });
});
