import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleMessage, ruleName } from '../src/ionTabBadgeStyleIsNowBadgeStyleRule';
import { assertAnnotated, assertFailure, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-tab badgeStyle="sdfg"></ion-tab>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when tabBadgeStyle is passed in', () => {
      let source = `
            @Component({
              template: \`<ion-tab tabBadgeStyle="sdfg"></ion-tab>
                                   ~~~~~~~~~~~~~             
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

    it('should fail when tabBadgeStyle is passed in', () => {
      let source = `
            @Component({
              template: \`<ion-tab tabBadgeStyle="sdfg">
                                   ~~~~~~~~~~~~~
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
    it('should replace tabBadgeStyle with badgeStyle', () => {
      let source = `
        @Component({
          template: \`<ion-tab tabBadgeStyle="sdfg"></ion-tab>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: ruleMessage,
        startPosition: {
          line: 2,
          character: 31
        },
        endPosition: {
          line: 2,
          character: 44
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-tab badgeStyle="sdfg"></ion-tab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace tabBadgeStyle with badgeStyle', () => {
      let source = `
        @Component({
          template: \`
          <ion-tab tabBadgeStyle="sdfg">
          </ion-tab>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: ruleMessage,
        startPosition: {
          line: 3,
          character: 20
        },
        endPosition: {
          line: 3,
          character: 33
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
          <ion-tab badgeStyle="sdfg">
          </ion-tab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
