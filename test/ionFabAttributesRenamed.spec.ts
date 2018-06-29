import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionFabAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-fab horizontal="end" vertical="top"></ion-fab>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when center is used', () => {
      let source = `
            @Component({
              template: \`
              <ion-fab center>
                       ~~~~~~
                <ion-fab-list>
                  <ion-fab-button>
                    <ion-icon name="logo-vimeo"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The center attribute of ion-fab has been renamed. Use horizontal="center" instead.',
        source
      });
    });

    it('should fail when start is used', () => {
      let source = `
            @Component({
              template: \`
              <ion-fab start>
                       ~~~~~
                <ion-fab-list>
                  <ion-fab-button>
                    <ion-icon name="logo-vimeo"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The start attribute of ion-fab has been renamed. Use horizontal="start" instead.',
        source
      });
    });

    it('should fail when end is used', () => {
      let source = `
            @Component({
              template: \`
              <ion-fab end>
                       ~~~
                <ion-fab-list>
                  <ion-fab-button>
                    <ion-icon name="logo-vimeo"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The end attribute of ion-fab has been renamed. Use horizontal="end" instead.',
        source
      });
    });

    it('should fail when top is used', () => {
      let source = `
            @Component({
              template: \`
              <ion-fab top>
                       ~~~
                <ion-fab-list>
                  <ion-fab-button>
                    <ion-icon name="logo-vimeo"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The top attribute of ion-fab has been renamed. Use vertical="top" instead.',
        source
      });
    });

    it('should fail when bottom is used', () => {
      let source = `
            @Component({
              template: \`
              <ion-fab bottom>
                       ~~~~~~
                <ion-fab-list>
                  <ion-fab-button>
                    <ion-icon name="logo-vimeo"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The bottom attribute of ion-fab has been renamed. Use vertical="bottom" instead.',
        source
      });
    });

    it('should fail when middle is used', () => {
      let source = `
            @Component({
              template: \`
              <ion-fab middle>
                       ~~~~~~
                <ion-fab-list>
                  <ion-fab-button>
                    <ion-icon name="logo-vimeo"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The middle attribute of ion-fab has been renamed. Use vertical="center" instead.',
        source
      });
    });

    it('should fail when multiple are used', () => {
      let source = `
            @Component({
              template: \`
              <ion-fab start middle>
                       ~~~~~ ^^^^^^
                <ion-fab-list>
                  <ion-fab-button>
                    <ion-icon name="logo-vimeo"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>
              \`
            })
            class Bar {}
          `;

      assertMultipleAnnotated({
        ruleName,
        source,
        failures: [
          {
            char: '~',
            msg: 'The start attribute of ion-fab has been renamed. Use horizontal="start" instead.'
          },
          {
            char: '^',
            msg: 'The middle attribute of ion-fab has been renamed. Use vertical="center" instead.'
          }
        ]
      });
    });
  });

  describe('replacements', () => {
    it('should replace center with horizontal="center"', () => {
      let source = `
        @Component({
          template: \`<ion-fab center></ion-fab>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The center attribute of ion-fab has been renamed. Use horizontal="center" instead.',
        startPosition: {
          line: 2,
          character: 30
        },
        endPosition: {
          line: 2,
          character: 36
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-fab horizontal="center"></ion-fab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace middle with vertical="center"', () => {
      let source = `
        @Component({
          template: \`<ion-fab middle></ion-fab>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The middle attribute of ion-fab has been renamed. Use vertical="center" instead.',
        startPosition: {
          line: 2,
          character: 30
        },
        endPosition: {
          line: 2,
          character: 36
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-fab vertical="center"></ion-fab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace multiple', () => {
      let source = `
        @Component({
          template: \`<ion-fab end bottom></ion-fab>
          \`
        })
        class Bar {}
      `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'The end attribute of ion-fab has been renamed. Use horizontal="end" instead.',
          startPosition: {
            line: 2,
            character: 30
          },
          endPosition: {
            line: 2,
            character: 33
          }
        },
        {
          message: 'The bottom attribute of ion-fab has been renamed. Use vertical="bottom" instead.',
          startPosition: {
            line: 2,
            character: 34
          },
          endPosition: {
            line: 2,
            character: 40
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-fab horizontal="end" vertical="bottom"></ion-fab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
