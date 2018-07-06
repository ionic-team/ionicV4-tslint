import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionButtonsAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-buttons slot="secondary">
            <ion-button>Secondary</ion-button>
          </ion-buttons>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when start is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-buttons start>
                       ~~~~~
            <ion-button>Secondary</ion-button>
          </ion-buttons>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The start attribute of ion-buttons has been renamed. Use slot="secondary" instead.',
        source
      });
    });

    it('should fail when end is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-buttons end>
                       ~~~
            <ion-button>Primary</ion-button>
          </ion-buttons>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The end attribute of ion-buttons has been renamed. Use slot="primary" instead.',
        source
      });
    });

    it('should fail when left is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-buttons left>
                       ~~~~
            <ion-button>Left</ion-button>
          </ion-buttons>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The left attribute of ion-buttons has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when right is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-buttons right>
                       ~~~~~
            <ion-button>Right</ion-button>
          </ion-buttons>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The right attribute of ion-buttons has been renamed. Use slot="end" instead.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace start with slot="secondary"', () => {
      let source = `
        @Component({
          template: \`
            <ion-buttons start>
              <ion-button>Secondary</ion-button>
            </ion-buttons>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The start attribute of ion-buttons has been renamed. Use slot="secondary" instead.',
        startPosition: {
          line: 3,
          character: 25
        },
        endPosition: {
          line: 3,
          character: 30
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-buttons slot="secondary">
              <ion-button>Secondary</ion-button>
            </ion-buttons>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace end with slot="primary"', () => {
      let source = `
        @Component({
          template: \`
            <ion-buttons end>
              <ion-button>Primary</ion-button>
            </ion-buttons>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The end attribute of ion-buttons has been renamed. Use slot="primary" instead.',
        startPosition: {
          line: 3,
          character: 25
        },
        endPosition: {
          line: 3,
          character: 28
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-buttons slot="primary">
              <ion-button>Primary</ion-button>
            </ion-buttons>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace left with slot="start"', () => {
      let source = `
        @Component({
          template: \`
            <ion-buttons left>
              <ion-button>Left</ion-button>
            </ion-buttons>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The left attribute of ion-buttons has been renamed. Use slot="start" instead.',
        startPosition: {
          line: 3,
          character: 25
        },
        endPosition: {
          line: 3,
          character: 29
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-buttons slot="start">
              <ion-button>Left</ion-button>
            </ion-buttons>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace right with slot="end"', () => {
      let source = `
        @Component({
          template: \`
            <ion-buttons right>
              <ion-button>Right</ion-button>
            </ion-buttons>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The right attribute of ion-buttons has been renamed. Use slot="end" instead.',
        startPosition: {
          line: 3,
          character: 25
        },
        endPosition: {
          line: 3,
          character: 30
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-buttons slot="end">
              <ion-button>Right</ion-button>
            </ion-buttons>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
