import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionRangeAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-range>
            <ion-icon name="sunny" slot="start"></ion-icon>
          </ion-range>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when range-start is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-range>
            <ion-icon name="sunny" range-start></ion-icon>
                                   ~~~~~~~~~~~
          </ion-range>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The range-start attribute of ion-icon has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when range-left is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-range>
            <ion-icon name="sunny" range-left></ion-icon>
                                   ~~~~~~~~~~
          </ion-range>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The range-left attribute of ion-icon has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when range-end is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-range>
            <ion-icon name="sunny" range-end></ion-icon>
                                   ~~~~~~~~~
          </ion-range>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The range-end attribute of ion-icon has been renamed. Use slot="end" instead.',
        source
      });
    });

    it('should fail when range-right is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-range>
            <ion-icon name="sunny" range-right></ion-icon>
                                   ~~~~~~~~~~~
          </ion-range>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The range-right attribute of ion-icon has been renamed. Use slot="end" instead.',
        source
      });
    });

    it('should fail when used with any element', () => {
      let source = `
      @Component({
        template: \`
          <ion-range>
            <i range-left></i>
               ~~~~~~~~~~
            <ion-label range-right>200</i>
                       ^^^^^^^^^^^
          </ion-range>
        \`
      })
      class Bar{}
          `;

      assertMultipleAnnotated({
        ruleName,
        source,
        failures: [
          {
            char: '~',
            msg: 'The range-left attribute of i has been renamed. Use slot="start" instead.'
          },
          {
            char: '^',
            msg: 'The range-right attribute of ion-label has been renamed. Use slot="end" instead.'
          }
        ]
      });
    });
  });

  describe('replacements', () => {
    it('should replace range-start with slot="start"', () => {
      let source = `
        @Component({
          template: \`
            <ion-range>
              <ion-icon name="sunny" range-start></ion-icon>
            </ion-range>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The range-start attribute of ion-icon has been renamed. Use slot="start" instead.',
        startPosition: {
          line: 4,
          character: 37
        },
        endPosition: {
          line: 4,
          character: 48
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-range>
              <ion-icon name="sunny" slot="start"></ion-icon>
            </ion-range>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace range-left with slot="start"', () => {
      let source = `
        @Component({
          template: \`
            <ion-range>
              <ion-icon name="sunny" range-left></ion-icon>
            </ion-range>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The range-left attribute of ion-icon has been renamed. Use slot="start" instead.',
        startPosition: {
          line: 4,
          character: 37
        },
        endPosition: {
          line: 4,
          character: 47
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-range>
              <ion-icon name="sunny" slot="start"></ion-icon>
            </ion-range>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace range-right with slot="end"', () => {
      let source = `
        @Component({
          template: \`
            <ion-range>
              <ion-icon name="sunny" range-right></ion-icon>
            </ion-range>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The range-right attribute of ion-icon has been renamed. Use slot="end" instead.',
        startPosition: {
          line: 4,
          character: 37
        },
        endPosition: {
          line: 4,
          character: 48
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-range>
              <ion-icon name="sunny" slot="end"></ion-icon>
            </ion-range>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace range-end with slot="end"', () => {
      let source = `
        @Component({
          template: \`
            <ion-range>
              <ion-icon name="sunny" range-end></ion-icon>
            </ion-range>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The range-end attribute of ion-icon has been renamed. Use slot="end" instead.',
        startPosition: {
          line: 4,
          character: 37
        },
        endPosition: {
          line: 4,
          character: 46
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-range>
              <ion-icon name="sunny" slot="end"></ion-icon>
            </ion-range>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
