#include "../include/player.h"

/*
 *	Global variables to manage the data
 */

char		g_player_name[NAME_SIZE];
char		g_score[SCORE_SIZE];
char		g_last_score[LAST_SCORE_SIZE];
static int	centinela = 0;

static t_player	players[MAX_PLAYERS];	// A array of MAX_PLAYERS

/*
int get_player_id(char *user, size_t len)
{
	if (user)
		return (0);
	int i = 0;
	while (i < centinela)
	{
		if (strncmp("mortegaa", user, NAME_SIZE) == 0)
			return ;
		i++;
	}
	return (-1);
}
*/


ArbResult add_player(uint8_t *input, size_t len)
{
	players[centinela].id = centinela + 1;
	memcpy(players[centinela].name, input, NAME_SIZE);
	set_actual_address(0);
	send_player_info(players[centinela].name, "000", "00000");

	centinela += 1;

	return _return_short_string(Success, "New player registered");
}

void set_bebi32(bebi32 dst, char *data, size_t len, int offset)
{
	int i = 0;
	while (i < len)
	{
		dst[offset + i] = data[i];
		i++;
	}
}

char *get_bebi32(bebi32 src, char *dst, size_t len, int offset)
{
	int i = 0;
	while (i < len)
	{
		dst[i] = src[offset + i];
		i++;
	}
	return dst;
}

void set_name(bebi32 dst, char *name)
{
	set_bebi32(dst, name, NAME_SIZE, 10);
}

char *get_name(bebi32 src)
{
	return get_bebi32(src, g_player_name, NAME_SIZE, 10);
}

void set_score(bebi32 dst, char *score)
{
	set_bebi32(dst, score, SCORE_SIZE, 19);
}

char *get_score(bebi32 src)
{
	return get_bebi32(src, g_score, SCORE_SIZE, 19);
}

void set_delimiter(bebi32 dst, char *del, int where)
{
	set_bebi32(dst, del, 1, where);
}

void set_last_score(bebi32 dst, char *last_score)
{
	set_bebi32(dst, last_score, 1, 23);
	set_delimiter(dst, ":", 24);
	set_bebi32(dst, last_score + 1, 1, 25);
	set_delimiter(dst, ":", 26);
	set_bebi32(dst, last_score + 2, 1, 27);
	set_delimiter(dst, ":", 28);
	set_bebi32(dst, last_score + 3, 1, 29);
	set_delimiter(dst, ":", 30);
	set_bebi32(dst, last_score + 4, 1, 31);
}

ArbResult send_player_info(char *name, char *score, char *last_score)
{
	// bebi32 info = name + ":" + "000" + ":" + "0" + ":" + "0" + ":" + "0" + ":" + "0" + ":" + "0";
	
	bebi32 info;

	set_actual_address(0);

	set_name(info, name);
	set_delimiter(info, ":", 18);
	set_score(info, score);
	set_delimiter(info, ":", 22);
	set_last_score(info, last_score);

	return set_value(info, 32);
}

ArbResult set_player_info(uint8_t *input, size_t len)
{
	void *info = malloc(22);
	info = (char *)input;

	return send_player_info(info, info + NAME_SIZE, info + NAME_SIZE + SCORE_SIZE);
}

ArbResult get_player_info(uint8_t *input, size_t len)
{
	//int id = get_player_id((char *)input, len);
	int id = 0;

	if (id < 0)
		return _return_short_string(Success, "Player NotFound");
	
	set_actual_address((char)id);
	
	const void *msg = malloc(32);
	ArbResult data = get_value(NULL, 0);
	if (data.status == Success)
		msg = data.output;
	else
		return _return_short_string(Success, "Failure Action");
	return _return_success_bebi32(msg);
}
