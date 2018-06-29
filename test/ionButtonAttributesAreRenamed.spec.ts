import { ruleName } from '../src/ionButtonAttributesAreRenamedRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-button slot="start"><ion-button>\`
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
        message: 'icon-left has been replaced by the slot="start" attribute.',
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
        message: 'icon-start has been replaced by the slot="start" attribute.',
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
        message: 'icon-right has been replaced by the slot="end" attribute.',
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
        message: 'icon-end has been replaced by the slot="end" attribute.',
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
        message: 'small has been replaced by the size attribute.',
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
        message: 'large has been replaced by the size attribute.',
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
        message: 'clear has been replaced by the fill attribute.',
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
        message: 'outline has been replaced by the fill attribute.',
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
        message: 'solid has been replaced by the fill attribute.',
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
        message: 'full has been replaced by the expand attribute.',
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
        message: 'block has been replaced by the expand attribute.',
        source
      });
    });
  });
});
