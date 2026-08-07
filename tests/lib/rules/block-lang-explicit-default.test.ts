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
      options: [{ script: { lang: 'js', allowNoLang: false } }]
    }
  ],
  invalid: [
    {
      code: '<template></template><script></script>',
      options: [{ script: { lang: 'js', allowNoLang: false } }],
      errors: [
        {
          message: "The 'lang' attribute of '<script>' is missing."
        }
      ]
    }
  ]
})
