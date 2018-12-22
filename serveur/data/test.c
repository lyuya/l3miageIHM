#include <stdio.h>
#include <stdlib.h>
int acceptConnetion(server_t* seveur){
	int err = 0;
	int conn_fd;
	socklen_t client_taille;
	struct sockaddr_in client_IP;
	client_taille = sizeof(client_IP);

	err = (conn_fd = accept(seveur->listen_fd, (struct sockaddr*)&client_IP, &client_taille));
	if(err == ERROR_SOCKET){
		printf("failed\n");
		return err;
	} else {
		printf("accept\n");
		return seveur->listen_fd;
	}
	printf("Client connecté\n");
	err = close (conn_fd);
	if(err == ERROR_SOCKET) {
		printf("failed\n");
		return err;
	} else {
		printf("close\n");
		return conn_fd;
	}
}