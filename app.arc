@app
strx-7131

@aws
region us-west-2
runtime node
profile strx

@http
/*
  method any
  src server

@static

@tables
users
  pk *String

streaks
  pk *String  # streakId
  sk **String # userId
