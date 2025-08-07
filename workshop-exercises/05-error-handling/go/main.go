package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

// Simple user data
var users = map[int]string{
	1: "Alice",
	2: "Bob", 
	3: "Charlie",
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Query().Get("id")
	id, _ := strconv.Atoi(idStr)
	
	if id < 0 {
		panic("Negative IDs not allowed!")
	}
	
	if id > 1000 {
		panic("ID too large!")
	}
	
	name := users[id] 
	
	fmt.Fprintf(w, `{"id": %d, "name": "%s"}`, id, name)
}

func main() {
	http.HandleFunc("/user", getUserHandler)
	
	fmt.Println("Server starting on :8080")
	fmt.Println("Try these URLs:")
	fmt.Println("  ✅ http://localhost:8080/user?id=1")
	fmt.Println("  💥 http://localhost:8080/user?id=invalid")
	fmt.Println("  💥 http://localhost:8080/user?id=-1") 
	fmt.Println("  💥 http://localhost:8080/user?id=9999")
	
	log.Fatal(http.ListenAndServe(":8080", nil))
}