import { RuleTester } from '../../eslint-compat'
import rule from '../../../lib/rules/block-lang'
import vueEslintParser from 'vue-eslint-parser'

const tester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
    ecmaVersion: 2015
  }
})

tester.run('block-lang (explicit default language)', rule, {
  valid: [
    {
      code: '<template></template><script lang="js"></script>',
      options: [{ script: { lang: 'js' } }]
    },
    {
      code: '<template></template><script></script>',
      options: [{ script: { lang: 'js', allowNoLang: true } }]
    }
  ],
  invalid: [
    {
      code: '<template></template><script></script>',
      options: [{ script: { lang: 'js' } }],
      errors: [
        {
          message: "The 'lang' attribute of '<script>' is missing."
        }
      ]
    },
    {
      code: '<template></template><script lang="ts"></script>',
      options: [{ script: { lang: 'js' } }],
      errors: [
        {
          message: "Only 'js' can be used for the 'lang' attribute of '<script>'."
        }
      ]
    }
  ]
})
