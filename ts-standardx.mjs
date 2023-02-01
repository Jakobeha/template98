#!/usr/bin/env node
// noinspection NodeCoreCodingAssistance,NpmUsedModulesInstalled

import { spawn } from 'child_process'
import { argv, stderr, stdout } from 'process'
import { createInterface } from 'readline'
import { blue, green, red } from 'colorette'

const ignoredRules = [
  // Allow typescript namespaces and combined type / function / namespace exports
  'import/export',
  '@typescript-eslint/no-namespace',
  '@typescript-eslint/no-redeclare',
  // It comes up surprisingly often when we know something is not null.
  // We already force it to be explicit '!' via strictNullChecks
  '@typescript-eslint/no-non-null-assertion',
  // We throw literals when fall-through control-flow is particularly useful
  '@typescript-eslint/no-throw-literal'
]

stderr.write('Modified ts-standard to suppress certain rules\n')
stderr.write(`The suppressed rules are: ${ignoredRules.map(blue).join(', ')}\n`)
stderr.write('Note that the --fix option will still change any fixable rules, even though they will be suppressed.\n')

const child = spawn('./node_modules/.bin/ts-standard', argv.slice(2))

let numErrors = 0
const readline = createInterface(child.stdout)
readline.on('line', line => {
  const rule = line.match(/\((.*)\)$/)?.[1]
  if (rule) {
    if (!ignoredRules.includes(rule)) {
      numErrors++
      stdout.write(red('Error '))
      stdout.write(line)
      stdout.write('\n')
    }
  } else {
    stdout.write(blue('Misc '))
    stdout.write(line)
    stdout.write('\n')
  }
})

child.stderr.on('data', (data) => {
  stderr.write(data)
})

child.on('close', () => {
  readline.close()
  if (numErrors > 0) {
    stderr.write(`${red(numErrors)} errors found\n`)
    process.exit(1)
  } else {
    stderr.write(`${green('No errors found!')} (except suppressed ones)\n`)
    process.exit(0)
  }
})
