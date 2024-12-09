#ifndef PLAYER_H
# define PLAYER_H

#include "../stylus-sdk-c/include/stylus_utils.h"
#include "../stylus-sdk-c/include/storage.h"
#include "../stylus-sdk-c/include/string.h"
#include "../stylus-sdk-c/include/stdlib.h"

#include "../include/handle_data.h"

/*
 *	Defines for possible future changes in size
 */

# define MAX_PLAYERS 12
# define NAME_SIZE 8
# define SCORE_SIZE 3
# define LAST_SCORE_SIZE 5


/*
 *	Struct to save the essencial player info
 */

typedef struct	s_player 
{
	char id;
	char name[NAME_SIZE];
}		t_player;



/*
 *	Prompts of manage player data
 */

//	Setters
void	set_bebi32(bebi32 dst, char *data, size_t len, int offset);
void	set_name(bebi32 dst, char *name);
void	set_score(bebi32 dst, char *score);
void	set_delimiter(bebi32 dst, char *del, int where);
void	set_last_score(bebi32 dst, char *last_score);

//	Getters
char	*get_bebi32(bebi32 src, char *dst, size_t len, int offset);
char	*get_name(bebi32 src);
char	*get_score(bebi32 src);


/*
 *	Prompts of player functions
 */

int		get_player_id(char *user, size_t len);
ArbResult	add_player(uint8_t *input, size_t len);
ArbResult	send_player_info(char *name, char *score, char *last_score);
ArbResult	set_player_info(uint8_t *input, size_t len);
ArbResult	get_player_info(uint8_t *input, size_t len);


// ArbResult get_podium(uint8_t *input, size_t len);

#endif
