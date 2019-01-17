<?php

namespace Tests\Feature;

use App\Notifications\UserRegisteredSuccessfully;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
	use DatabaseTransactions;

    /** @test */
    public function user_can_register()
    {
        Notification::fake();

    	$data['email'] = 'test@foo.com';
        $response = $this->post('/register', $data);
        $response->assertStatus(200);

        $user = User::first();

        $this->assertNotNull($user);
        $this->assertNotNull($user->activation_key);
        $this->assertNotNull($user->password);
        $this->assertEquals($data['email'], $user->email);

        Notification::assertSentTo([$user], UserRegisteredSuccessfully::class);
    }

    /** @test */
    public function user_can_activate_account()
    {
        $key = str_random(30).time();

        $user = factory(User::class)->create([
            'activation_key' => $key,
            'email_verified_at' => null
        ]);

        $response = $this->post('/account-activate', [ 
            'activation_key' => $key,
            'password' => '2120938123091'
        ]);

        $response->assertStatus(200);

        $refreshUser = User::whereId($user->id)->first();

        $this->assertNotNull($refreshUser);
        $this->assertNotNull($refreshUser->email_verified_at);
    }

    /** @test */
    public function can_check_if_activated()
    {
        $user = factory(User::class)->create();
        $data['activation_key'] = $user->activation_key;

        $response = $this->post('/api/user-check-active', $data);

        $response->assertStatus(200);
        $this->assertTrue($response->json('active'));
    }

    /** @test */
    public function activation_check_returns_false_when_user_not_activated()
    {
        $user = factory(User::class)->create([
            'email_verified_at' => null
        ]);
        $data['activation_key'] = $user->activation_key;

        $response = $this->post('/api/user-check-active', $data);

        $response->assertStatus(200);
        $this->assertFalse($response->json('active'));
    }
}
