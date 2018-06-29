import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleMessage, ruleName } from '../src/ionTabIconIsNowIconRule';
import { assertAnnotated, assertFailure, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-tab icon="sdfg"></ion-tab>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when tabIcon is passed in', () => {
      let source = `
            @Component({
              template: \`
              <ion-tab tabIcon="sdfg"></ion-tab>
                       ~~~~~~~              
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });

    it('should fail when tabIcon is passed in', () => {
      let source = `
            @Component({
              template: \`
              <ion-tab tabIcon="sdfg">
                       ~~~~~~~ 
              </ion-tab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace tabIcon with icon', () => {
      let source = `
        @Component({
          template: \`<ion-tab tabIcon="sdfg"></ion-tab>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: ruleMessage,
        startPosition: {
          line: 2,
          character: 30
        },
        endPosition: {
          line: 2,
          character: 37
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-tab icon="sdfg"></ion-tab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace tabIcon with icon', () => {
      let source = `
        @Component({
          template: \`
          <ion-tab tabIcon="sdfg">
          </ion-tab>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: ruleMessage,
        startPosition: {
          line: 3,
          character: 19
        },
        endPosition: {
          line: 3,
          character: 26
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
          <ion-tab icon="sdfg">
          </ion-tab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
