<?php

use App\Player;
use App\Team;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('import-mlb-data', function () {
	$client = new Client;
	$apiUrl = 'http://lookup-service-prod.mlb.com';

    $year = date('Y');

    $request = $client->get($apiUrl . "/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2017'");
    $json = json_decode($request->getBody()->getContents(), true);

    foreach($json['team_all_season']['queryResults']['row'] as $row) {
    		Team::updateOrCreate([
    			'name' => $row['name'],
    			'name_short' => $row['name_short'],
    			'mlb_org_short' =>  $row['mlb_org_short'],
    			'mlb_org_brief' => $row['mlb_org_brief'],
    			'name_display_short' => $row['name_display_short'],
    			'mlb_org_abbrev' => $row['mlb_org_abbrev'],
    			'name_display_long' => $row['name_display_long'],
    			'city' => $row['city'],
    			'state' => $row['state'],
    			'mlb_org_id' => $row['mlb_org_id'],
    			'league_id' => $row['league_id'],
    			'division_id' => $row['division_id'],
    			'venue_short' => $row['venue_short']
    		],
    		['mlb_org_id' => $row['mlb_org_id'] ]);

    		$playerRequest = $client->get($apiUrl . "/json/named.roster_40.bam?team_id='".$row['mlb_org_id']."'");
    		$playerJson = json_decode($playerRequest->getBody()->getContents(), true);
    		
    		foreach($playerJson['roster_40']['queryResults']['row'] as $player) {
    			Player::updateOrCreate([
    				'name_first' => $player['name_first'],
		            'name_last' => $player['name_last'],
		            'name_full' => $player['name_full'],
		            'name_display_first_last' => $player['name_display_first_last'],
		            'name_display_last_first' => $player['name_display_last_first'],
		            'name_use' => $player['name_use'],
		            'player_id' => $player['player_id'],
		            'team_id' => $player['team_id'],
		            'jersey_number' => $player['jersey_number'],
		            'primary_position' => $player['primary_position'],
		            'position_txt' => $player['position_txt'],
		            'bats' => $player['bats'],
		            'throws' => $player['throws']
		        ],
    			['player_id' => $player['player_id'] ]);
    			
    		}
    }
})->describe('Gets MLB data current year from API data and import to DB.');
