import { assertSuccess, assertAnnotated, assertFailure } from './testHelper';
import { Replacement, Utils } from 'tslint';
import { expect } from 'chai';
import { ruleName } from '../src/ionNavbarIsNowIonToolbarRule';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-toolbar></ion-toolbar>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when navbar is passed in', () => {
      let source = `
        @Component({
          template: \`
            <ion-navbar></ion-navbar>
             ~~~~~~~~~~
          \`
        })
        class Bar {}
      `;

      assertAnnotated({
        ruleName,
        source,
        message: 'The ion-navbar component is now named ion-toolbar.'
      });
    });

    it('should fail when navbar is passed in', () => {
      let source = `
        @Component({
          template: \`
          <ion-navbar>
           ~~~~~~~~~~
            <label>Something</label>
          </ion-navbar>
          \`
        })
        class Bar {}
      `;

      assertAnnotated({
        ruleName,
        source,
        message: 'The ion-navbar component is now named ion-toolbar.'
      });
    });
  });

  describe('replacements', () => {
    it('should fail when ion-navbar is used', () => {
      let source = `
        @Component({
          template: \`
            <ion-navbar></ion-navbar>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The ion-navbar component is now named ion-toolbar.',
        startPosition: {
          line: 3,
          character: 13
        },
        endPosition: {
          line: 3,
          character: 23
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
        @Component({
          template: \`
            <ion-toolbar></ion-toolbar>
          \`
        })
        class Bar {}
      `);
    });

    it('should fail when ion-navbar is used on multiple lines', () => {
      let source = `
        @Component({
          template: \`
            <ion-navbar>
              <ion-title>My Navigation Bar</ion-title>
            </ion-navbar>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The ion-navbar component is now named ion-toolbar.',
        startPosition: {
          line: 3,
          character: 13
        },
        endPosition: {
          line: 3,
          character: 23
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
        @Component({
          template: \`
            <ion-toolbar>
              <ion-title>My Navigation Bar</ion-title>
            </ion-toolbar>
          \`
        })
        class Bar {}
      `);
    });
  });
});
