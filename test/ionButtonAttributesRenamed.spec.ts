import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionButtonAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-button slot="start"></ion-button>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when icon-left is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button icon-left></ion-button>\`
                      ~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The icon-left attribute of ion-button has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when icon-start is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button icon-start></ion-button>\`
                      ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The icon-start attribute of ion-button has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when icon-right is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button icon-right></ion-button>\`
                      ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The icon-right attribute of ion-button has been renamed. Use slot="end" instead.',
        source
      });
    });

    it('should fail when icon-end is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button icon-end></ion-button>\`
                      ~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The icon-end attribute of ion-button has been renamed. Use slot="end" instead.',
        source
      });
    });

    it('should fail when small is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button small></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The small attribute of ion-button has been renamed. Use size="small" instead.',
        source
      });
    });

    it('should fail when large is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button large></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The large attribute of ion-button has been renamed. Use size="large" instead.',
        source
      });
    });

    it('should fail when clear is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button clear></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The clear attribute of ion-button has been renamed. Use fill="clear" instead.',
        source
      });
    });

    it('should fail when outline is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button outline></ion-button>\`
                      ~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The outline attribute of ion-button has been renamed. Use fill="outline" instead.',
        source
      });
    });

    it('should fail when solid is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button solid></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The solid attribute of ion-button has been renamed. Use fill="solid" instead.',
        source
      });
    });

    it('should fail when full is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button full></ion-button>\`
                      ~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The full attribute of ion-button has been renamed. Use expand="full" instead.',
        source
      });
    });

    it('should fail when block is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button block></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The block attribute of ion-button has been renamed. Use expand="block" instead.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace icon-left with slot="start"', () => {
      let source = `
        @Component({
          template: \`<ion-button icon-left></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The icon-left attribute of ion-button has been renamed. Use slot="start" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 42
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button slot="start"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace icon-start with slot="start"', () => {
      let source = `
        @Component({
          template: \`<ion-button icon-start></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The icon-start attribute of ion-button has been renamed. Use slot="start" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 43
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button slot="start"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace icon-right with slot="end"', () => {
      let source = `
        @Component({
          template: \`<ion-button icon-right></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The icon-right attribute of ion-button has been renamed. Use slot="end" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 43
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button slot="end"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace icon-end with slot="end"', () => {
      let source = `
        @Component({
          template: \`<ion-button icon-end></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The icon-end attribute of ion-button has been renamed. Use slot="end" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 41
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button slot="end"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace small with size="small"', () => {
      let source = `
        @Component({
          template: \`<ion-button small></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The small attribute of ion-button has been renamed. Use size="small" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 38
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button size="small"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace large with size="large"', () => {
      let source = `
        @Component({
          template: \`<ion-button large></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The large attribute of ion-button has been renamed. Use size="large" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 38
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button size="large"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace clear with fill="clear"', () => {
      let source = `
        @Component({
          template: \`<ion-button clear></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The clear attribute of ion-button has been renamed. Use fill="clear" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 38
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button fill="clear"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace outline with fill="outline"', () => {
      let source = `
        @Component({
          template: \`<ion-button outline></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The outline attribute of ion-button has been renamed. Use fill="outline" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 40
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button fill="outline"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace solid with fill="solid"', () => {
      let source = `
        @Component({
          template: \`<ion-button solid></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The solid attribute of ion-button has been renamed. Use fill="solid" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 38
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button fill="solid"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace full with expand="full"', () => {
      let source = `
        @Component({
          template: \`<ion-button full></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The full attribute of ion-button has been renamed. Use expand="full" instead.',
        startPosition: {
          line: 2,
          character: 33
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
          template: \`<ion-button expand="full"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace block with expand="block"', () => {
      let source = `
        @Component({
          template: \`<ion-button block></ion-button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The block attribute of ion-button has been renamed. Use expand="block" instead.',
        startPosition: {
          line: 2,
          character: 33
        },
        endPosition: {
          line: 2,
          character: 38
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-button expand="block"></ion-button>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
