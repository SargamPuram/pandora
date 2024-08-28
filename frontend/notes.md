curl -X POST http://localhost:3001/newWallets \                                       
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c
2VySWQiOiIyNTRjNTRhZi03OTU1LTQ2YjMtODZjOC01OTQxZjA4ZDAwMTYiLCJpYXQiO
jE3MjQ4NDk3OTN9.qJbIwlFPNVvqfOMHk9q14UnUjqv6A53riObPm5jtwts"
{"id":"66f0a71e-2522-4046-aeaf-12b38f185152","ownerId":"254c54af-7955-46b3-86c8-5941f08d0016","threshold":2,"createdAt":"2024-08-28T14:20:11.215Z","updatedAt":"2024-08-28T14:20:11.215Z"}[sargam@jensen sol-hack]$ 

[sargam@jensen backend]$ ts-node src/routes/createMuliSigWallet.ts
(node:735459) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
Generated multisig public key: Fei3c4cWeKkTNuRH1iPZKzHSv8EmZXfRp6UPwqroZ4vH
[sargam@jensen backend]$ 
