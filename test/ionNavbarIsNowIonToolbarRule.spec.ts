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
              template: \` <ion-navbar></ion-navbar>
                                              ~~~~~~~~~~~~~~~~~
              \`
            })
            class Bar {}
          `;

      const fail = {
        message: 'ion-navbar is no longer used. Please use ion-toolbar.',
        startPosition: {
          line: 2,
          character: 27
        },
        endPosition: {
          line: 2,
          character: 39
        }
      };

      assertFailure(ruleName, source, fail);
    });

    it('should fail when navbar is passed in', () => {
      let source = `
            @Component({
              template: \` 
              <ion-navbar>
                <label>Something</label>
              </ion-navbar>
              \`
            })
            class Bar {}
          `;

      const fail = {
        message: 'ion-navbar is no longer used. Please use ion-toolbar.',
        startPosition: {
          line: 3,
          character: 15
        },
        endPosition: {
          line: 4,
          character: 0
        }
      };

      assertFailure(ruleName, source, fail);
    });
  });

  describe('replacements', () => {
    it('should fail when navbar is passed in', () => {
      let source = `
            @Component({
              template: \` <ion-navbar></ion-navbar>
              \`
            })
            class Bar {}
          `;

      const fail = {
        message: 'ion-navbar is no longer used. Please use ion-toolbar.',
        startPosition: {
          line: 2,
          character: 27
        },
        endPosition: {
          line: 2,
          character: 39
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
            @Component({
              template: \` <ion-toolbar>
  <ion-buttons slot="start">
    <ion-back-button></ion-back-button>
  </ion-buttons>
</ion-toolbar>
              \`
            })
            class Bar {}
          `);
    });

    it('should fail when navbar is passed in', () => {
      let source = `
            @Component({
              template: \` <ion-navbar><label>Hello</label></ion-navbar>
              \`
            })
            class Bar {}
          `;

      const fail = {
        message: 'ion-navbar is no longer used. Please use ion-toolbar.',
        startPosition: {
          line: 2,
          character: 27
        },
        endPosition: {
          line: 2,
          character: 39
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
            @Component({
              template: \` <ion-toolbar>
  <ion-buttons slot="start">
    <ion-back-button></ion-back-button>
  </ion-buttons><label>Hello</label>
</ion-toolbar>
              \`
            })
            class Bar {}
          `);
    });

    it('should fail when navbar is passed in', () => {
      let source = `
            @Component({
              template: \`
              <ion-navbar>
                <ion-title>Edit Group</ion-title>
              </ion-navbar>
              \`
            })
            class Bar {}
          `;

      const fail = {
        message: 'ion-navbar is no longer used. Please use ion-toolbar.',
        startPosition: {
          line: 3,
          character: 15
        },
        endPosition: {
          line: 4,
          character: 0
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
            @Component({
              template: \`
              <ion-toolbar>
  <ion-buttons slot="start">
    <ion-back-button></ion-back-button>
  </ion-buttons><ion-title>Edit Group</ion-title>
</ion-toolbar>              \`
            })
            class Bar {}
          `);
    });

    it('should fail when navbar is passed in', () => {
      let source = `
            @Component({
              template: \`
              <ion-navbar attr="something">
                <ion-title>Edit Group</ion-title>
              </ion-navbar>
              \`
            })
            class Bar {}
          `;

      const fail = {
        message: 'ion-navbar is no longer used. Please use ion-toolbar.',
        startPosition: {
          line: 3,
          character: 14
        },
        endPosition: {
          line: 3,
          character: 43
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
            @Component({
              template: \`
             <ion-toolbar>
  <ion-buttons slot="start">
    <ion-back-button></ion-back-button>
  </ion-buttons><ion-title>Edit Group</ion-title>
</ion-toolbar>
              \`
            })
            class Bar {}
          `);
    });

    it('should fail when navbar is passed in', () => {
      let source = `
            @Component({
              template: \`
              <ion-header>
                <ion-navbar>
                  <ion-button menuToggle>
                    <ion-icon name="menu"></ion-icon>
                  </ion-button>
                  <ion-title>Profile</ion-title>
                </ion-navbar>
              </ion-header>
              <ion-content>
                <user-profile></user-profile>
              </ion-content>
              \`
            })
            class Bar {}
          `;

      const fail = {
        message: 'ion-navbar is no longer used. Please use ion-toolbar.',
        startPosition: {
          line: 4,
          character: 17
        },
        endPosition: {
          line: 5,
          character: 0
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
            @Component({
              template: \`
              <ion-header>
                <ion-toolbar>
  <ion-buttons slot="start">
    <ion-back-button></ion-back-button>
  </ion-buttons><ion-button menuToggle>
                    <ion-icon name="menu"></ion-icon>
                  </ion-button>
                  <ion-title>Profile</ion-title>
</ion-toolbar>
              <ion-content>
                <user-profile></user-profile>
              </ion-content>
              \`
            })
            class Bar {}
          `);
    });
  });
});
