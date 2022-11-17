#!/bin/bash
# Copyright (c) 2022 4ndrs <andres.degozaru@gmail.com>
# SPDX-License-Identifier: MIT

# This file is meant to be sourced: source ./curl.profile
# functions will then be available directly in the terminal
# as commands

ENDPOINT=http://localhost:3001/api/notes
PRETTIFY=('python' '-m' 'json.tool')

#######################################
# Gets all the notes in the current server
# if an argument is supplied, it will then be
# used as the ID to get a single note
# Arguments:
#   ID of the note to get
#######################################
notes_get() {
    if [[ $# -eq 0 ]]; then
        curl -v $ENDPOINT | ${PRETTIFY[@]}
        return
    fi

    curl -v $ENDPOINT/$1 | ${PRETTIFY[@]}
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

    curl -vX DELETE $ENDPOINT/$1
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
    curl -v $ENDPOINT --json $json
    echo "\n"
}

#######################################
# Puts to a note in the server
# Usage is similar to notes_post, but
# needs the note's ID
#
# echo '{ "content": "hello", "important": false }' | notes_put id
#
# Arguments:
#       ID of the note to put
#######################################
notes_put() {
    if [[ $# -eq 0 ]]; then
        echo 'An id is needed to send the put request'
        return
    fi

    read -d '' json
    curl -vX PUT $ENDPOINT/$1 --json $json
    echo "\n"
}
