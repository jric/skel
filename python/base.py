#!/usr/bin/env python3
import unittest
import apperror
from docopt import docopt

'''
REPLACE DESCRIPTION OF THE MODULE OR PROGRAM HERE
'''

USAGE = """
Usage:
  REPLACE.py [--verbose]... [--debug]
  REPLACE.py -h | --help
  REPLACE.py --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  -v --verbose  Show more diagnostics
"""

l = apperror.AppLogger('REPLACE.py')

class TestREPLACE(unittest.TestCase):

    def test_REPLACE(self):
        pass

if __name__ == '__main__':
    args = docopt(USAGE, version='REPLACE.py 1.0')
    l.setFromArgs(args)
    unittest.main() 