#!/bin/bash
# Copyright (c) 2022 4ndrs <andres.degozaru@gmail.com>
# SPDX-License-Identifier: MIT

# This file is meant to be sourced: source curl.profile
# functions will then be available directly in the terminal
# as commands

#######################################
# Gets all the notes in the current server
# if an argument is supplied, it will then be
# used as the ID to get a single note
# ARGUMENTS:
#   ID of the note to get
#######################################
notes_get() {
    if [[ $# -eq 0 ]]; then
        curl -s http://localhost:3001/api/notes | python -m json.tool
        return
    fi

    curl -s http://localhost:3001/api/notes/$1 | python -m json.tool
}

#######################################
# Deletes a note from the current server
# Arguments:
#       ID of the note to delete
#######################################
notes_delete() {
    if [[ $# -eq 0 ]]; then
        echo 'An id is needed to send the delete request'
        return
    fi

    curl -vX DELETE http://localhost:3001/api/notes/$1
    echo "\n"
}

#######################################
# Posts a new note to the server
#
# Use with heredoc:
#
# notes_post << EOF
# {
#   "content": "hello, world",
#   "important": false
# }
# EOF
#
# Or piping a json file:
#
# cat data.json | notes_post
#
# Or inline:
# echo '{ "content": "hello" }' | notes_post
#
#######################################
notes_post() {
    read -d '' json
    curl -v http://localhost:3001/api/notes --json $json
    echo "\n"
}
